#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetResourcesDef {
    static constexpr std::uint8_t opcode = 0xa0;
    static constexpr std::string_view name = "IT_SET_RESOURCES";
    static constexpr std::string_view desc = "Bind GPU hardware queues and resource limits";
};
}
