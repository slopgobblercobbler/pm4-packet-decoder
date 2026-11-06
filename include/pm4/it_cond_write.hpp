#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItCondWriteDef {
    static constexpr std::uint8_t opcode = 0x45;
    static constexpr std::string_view name = "IT_COND_WRITE";
    static constexpr std::string_view desc = "Conditional memory write evaluated against comparison register";
};
}
