#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItWaitRegMemDef {
    static constexpr std::uint8_t opcode = 0x3c;
    static constexpr std::string_view name = "IT_WAIT_REG_MEM";
    static constexpr std::string_view desc = "Wait for memory or register condition satisfying comparison mask";
};
}
