#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetBaseDef {
    static constexpr std::uint8_t opcode = 0x11;
    static constexpr std::string_view name = "IT_SET_BASE";
    static constexpr std::string_view desc = "Set base address for subsequent indexed draw or dispatch packets";
};
}
